//--------------------ActiveAccount--------------------//
export function getActiveAccount(user) {
  let isActive = false;
  // if ((user?.Payment && !user?.IsExpired) || user?.FreeAccess || user?.id === 6) {
  if ((user?.Payment && !user?.IsExpired) || user?.FreeAccess) {
    isActive = true;
  }
  return isActive;
}
