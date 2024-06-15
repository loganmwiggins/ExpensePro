using System.Security.Claims;

namespace ExpensesAngularAPI.Helpers
{
    public class CurrentUserFinder
    {
        public static int GetCurrentUserId(ClaimsPrincipal user)
        {   
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var userIdClaim = user.FindFirst("UserID");
            if (userIdClaim == null)
            {
                throw new InvalidOperationException("User ID claim not found");
            }

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                throw new InvalidOperationException("User ID claim is not a valid integer");
            }

            return userId;
        }
    }
}