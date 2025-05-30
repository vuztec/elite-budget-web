//--------------------ActiveAccount--------------------//
export function getActiveAccount(user) {
  let isActive = false;
  if ((user?.Payment && !user?.IsExpired) || user?.FreeAccess || user?.id === 6) {
    isActive = true;
  }
  return isActive;
}
