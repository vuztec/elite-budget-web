//--------------------ActiveAccount--------------------//
export function getActiveAccount(user) {
  let isActive = false;
  if ((user?.Payment && !user?.IsExpired) || user?.FreeAccess) {
    isActive = true;
  }
  return isActive;
}
