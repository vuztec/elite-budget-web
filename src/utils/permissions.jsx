//--------------------ActiveAccount--------------------//
export function getActiveAccount(user) {
  let isActive = false;
  if (user.Payment && !user.IsExpired) {
    isActive = true;
  }
  return isActive;
}
