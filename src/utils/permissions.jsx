//--------------------ActiveAccount--------------------//
export function getActiveAccount(user) {
  const currentDate = new Date();
  const subscription = user?.SubscribeDate ? new Date(user?.SubscribeDate) : '';
  const trialEnd = new Date(new Date(user?.CreatedAt).setDate(new Date(user?.CreatedAt).getDate() + 14));
  const isTrial = !subscription || currentDate <= trialEnd;
  let isActive = false;
  // if ((user?.Payment && !user?.IsExpired) || user?.FreeAccess || user?.id === 6) {
  if ((user?.Payment && !user?.IsExpired) || user?.FreeAccess || isTrial) {
    isActive = true;
  }
  return isActive;
}
