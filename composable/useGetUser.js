export const useGetUser = async () => {
  const { data: userData } = await useFetch(`/api/v2/user/tao-user`);

  console.log("🚀 ~ getTemplateData ~ userData:", userData.value);

  return userData.value?.data[0] || {};
};
