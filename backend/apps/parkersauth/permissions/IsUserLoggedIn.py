from rest_framework.permissions import BasePermission

class IsUserLoggedIn(BasePermission):
    def has_permission(self, request, view):
        is_loggedIn = bool(request.user)

        return is_loggedIn