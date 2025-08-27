export const useIsSession = async () => {
  const { data: session } = await authClient.useSession(useFetch);


  console.log(session.value);
  if (session.value) {
    return true
  }else{
    return false
  }
}
