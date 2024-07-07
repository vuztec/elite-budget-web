export const handleAxiosResponseError = (err, orginalMessage) => {
  if (err.response && err.response.data) {
    return err.response.data.message;
  }

  return orginalMessage ? err.message : "Something Went Wrong...!";
};
