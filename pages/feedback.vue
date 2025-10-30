<script setup>
import DropDownMenu from '~/components/common/DropDownMenu.vue'
import LoadingToast from '~/components/pop/LoadingToast.vue'
import { useFeedback } from '~/composable/useFeedback'

const feedbackType = ref('feedback')
const message = ref('')
const email = ref('')
const isSubmitting = ref(false)
const showSuccess = ref(false)
const errorMessage = ref('')

const FeedBackOption = [
  { label: 'Feedback', value: 'feedback' },
  { label: 'Issue', value: 'issue' },
  { label: 'Idea', value: 'idea' }
]

const handleSelectionChange = (params) => {
  feedbackType.value = params.value
}

const submitFeedback = async () => {
  // Prevent multiple submissions
  if (isSubmitting.value) return

  // Validate message
  if (!message.value.trim()) {
    errorMessage.value = 'Please enter your message.'
    setTimeout(() => errorMessage.value = '', 3000)
    return
  }

  // Validate email
  if (!email.value.trim()) {
    errorMessage.value = 'Please enter your email address.'
    setTimeout(() => errorMessage.value = '', 3000)
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const body = {
      type: feedbackType.value,
      msg: message.value,
      email: email.value
    }

    await useFeedback(body)

    // Show success message
    showSuccess.value = true

    // Reset form
    feedbackType.value = 'feedback'
    message.value = ''
    email.value = ''

    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)

  } catch (error) {
    console.error('Feedback submission error:', error)
    errorMessage.value = 'Failed to submit feedback. Please try again.'
    setTimeout(() => errorMessage.value = '', 3000)
  } finally {
    isSubmitting.value = false
  }
}

const charCount = computed(() => message.value.length)
const maxChars = 1000

</script>

<template>
  <section class="page-container">
    <header>
      <h1>Feedback</h1>
      <p>Help us improve Cook by sharing your thoughts</p>
    </header>

    <!-- Success Message -->
    <Transition name="slide-down">
      <div v-if="showSuccess" class="success-banner">
        <div class="success-icon">✓</div>
        <div class="success-content">
          <h3>Thank you for your feedback!</h3>
          <p>We've received your message and will review it shortly. A confirmation email has been sent to {{ email }}.</p>
        </div>
      </div>
    </Transition>

    <!-- Error Message -->
    <Transition name="slide-down">
      <div v-if="errorMessage" class="error-banner">
        <div class="error-icon">⚠</div>
        <div class="error-content">
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </Transition>

    <form class="feedback-wrapper" @submit.prevent="submitFeedback">
      <div class="feedback-row">
        <label for="email">Email <span class="required">*</span></label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="you@domain.com"
          required
          class="fb-input"
          :disabled="isSubmitting"
        />
      </div>

      <div class="feedback-row">
        <label for="type">Type <span class="required">*</span></label>
        <DropDownMenu
          id="type"
          :options="FeedBackOption"
          @change="handleSelectionChange"
          :default-value="feedbackType"
        />
      </div>

      <div class="feedback-row vertical">
        <div class="message-label-row">
          <label for="message">Message <span class="required">*</span></label>
          <span class="char-count" :class="{ 'limit-reached': charCount >= maxChars }">
            {{ charCount }} / {{ maxChars }}
          </span>
        </div>
        <textarea
          id="message"
          v-model="message"
          placeholder="Tell us what's on your mind..."
          class="fb-textarea"
          :maxlength="maxChars"
          :disabled="isSubmitting"
          rows="6"
        ></textarea>
      </div>

      <div class="feedback-row end">
        <button
          type="submit"
          class="fb-button"
          :disabled="isSubmitting || !message.trim() || !email.trim()"
          :class="{ 'submitting': isSubmitting }"
        >
          <span v-if="!isSubmitting">Submit Feedback</span>
          <span v-else class="button-loader">
            <span class="spinner"></span>
            Submitting...
          </span>
        </button>
      </div>
    </form>

    <!-- Loading Toast -->
    <LoadingToast :isLoadingVisible="isSubmitting">
      <span class="loader"></span>
      <span class="message">Sending your feedback...</span>
    </LoadingToast>
  </section>
</template>

<style scoped>
.page-container {
  max-width: 700px;
  margin: 40px auto;
  padding: 20px;
  font-family: var(--font-k2d);
  color: var(--white);
}

.page-container header h1 {
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.page-container header p {
  font-size: 15px;
  color: var(--fg2);
  margin-bottom: 30px;
  font-weight: 300;
  opacity: 0.8;
}

/* Success Banner */
.success-banner {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: rgba(0, 245, 160, 0.1);
  border: 1px solid var(--green);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}

.success-icon {
  width: 32px;
  height: 32px;
  background: var(--green);
  color: var(--bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  flex-shrink: 0;
}

.success-content h3 {
  font-size: 16px;
  font-weight: 500;
  color: var(--green);
  margin: 0 0 6px 0;
}

.success-content p {
  font-size: 14px;
  color: var(--fg2);
  margin: 0;
  line-height: 1.5;
}

/* Error Banner */
.error-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 0, 110, 0.1);
  border: 1px solid var(--pink);
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 24px;
}

.error-icon {
  width: 28px;
  height: 28px;
  background: var(--pink);
  color: var(--bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  flex-shrink: 0;
}

.error-content p {
  font-size: 14px;
  color: var(--pink);
  margin: 0;
}

.feedback-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: var(--bg2);
  padding: 32px;
  border-radius: 12px;
  border: 1px solid var(--border);
}

.feedback-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.feedback-row.vertical {
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.feedback-row.end {
  justify-content: flex-end;
  margin-top: 8px;
}

.message-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

label {
  min-width: 100px;
  font-weight: 400;
  color: var(--fg);
  font-size: 14px;
  letter-spacing: 0.3px;
}

.required {
  color: var(--pink);
  margin-left: 2px;
}

.char-count {
  font-size: 12px;
  color: var(--fg2);
  opacity: 0.6;
  font-weight: 300;
  transition: all 0.2s ease;
}

.char-count.limit-reached {
  color: var(--pink);
  opacity: 1;
  font-weight: 400;
}

.fb-input {
  width: 100%;
  flex: 1;
  padding: 12px 14px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--white);
  font-size: 14px;
  transition: all 0.2s ease;
  font-family: var(--font-k2d);
}

.fb-input:focus {
  outline: none;
  border-color: var(--green);
  box-shadow: 0 0 0 3px rgba(0, 245, 160, 0.1);
}

.fb-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.fb-textarea {
  width: 100%;
  min-height: 140px;
  padding: 12px 14px;
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--white);
  font-family: var(--font-k2d);
  font-size: 14px;
  resize: vertical;
  line-height: 1.6;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.fb-textarea:focus {
  outline: none;
  border-color: var(--green);
  box-shadow: 0 0 0 3px rgba(0, 245, 160, 0.1);
}

.fb-textarea:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.fb-button {
  padding: 12px 32px;
  background: transparent;
  border: 1px solid var(--green);
  color: var(--green);
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.3px;
  min-width: 160px;
  justify-content: center;
}

.fb-button:hover:not(:disabled) {
  background-color: var(--green);
  color: var(--bg);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 245, 160, 0.2);
}

.fb-button:active:not(:disabled) {
  transform: translateY(0);
}

.fb-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.fb-button.submitting {
  background-color: var(--green);
  color: var(--bg);
  border-color: var(--green);
}

.button-loader {
  display: flex;
  align-items: center;
  gap: 10px;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid var(--bg);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Transitions */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Loading Toast Loader */
.loader {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top-color: var(--green);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

.message {
  font-size: 14px;
  font-weight: 400;
}


@media (max-width: 768px) {
  .page-container {
    padding: 16px;
    margin: 20px auto;
  }

  .page-container header h1 {
    font-size: 26px;
  }

  .page-container header p {
    font-size: 14px;
    margin-bottom: 24px;
  }

  .feedback-wrapper {
    padding: 24px;
    gap: 20px;
  }

  .feedback-row {
    flex-direction: column;
    align-items: flex-start;
  }

  label {
    min-width: auto;
  }

  .success-banner {
    padding: 16px;
    gap: 12px;
  }

  .success-icon {
    width: 28px;
    height: 28px;
    font-size: 16px;
  }

  .success-content h3 {
    font-size: 15px;
  }

  .success-content p {
    font-size: 13px;
  }

  .feedback-row.end {
    justify-content: stretch;
    width: 100%;
  }

  .fb-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .page-container header h1 {
    font-size: 24px;
  }

  .feedback-wrapper {
    padding: 20px;
  }

  .fb-textarea {
    min-height: 120px;
  }

  .char-count {
    font-size: 11px;
  }
}

</style>
