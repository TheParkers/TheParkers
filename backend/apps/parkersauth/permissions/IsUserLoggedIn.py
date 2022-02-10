from rest_framework.permissions import BasePermission

class IsUserLoggedIn(BasePermission):
    message = 'Only admin or teacher can edit student detail.'
    def has_permission(self, request, view):
        is_loggedIn = bool(request.user)

        return is_loggedIn