export const useGetUser = async () => {
  const { data: userData } = await useFetch(`/api/sso/user`);
  console.log("🚀 ~ getTemplateData ~ userData:", userData.value);

  return userData.value.data[0];
};
