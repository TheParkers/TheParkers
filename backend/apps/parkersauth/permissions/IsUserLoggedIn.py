from rest_framework.permissions import BasePermission

class IsUserLoggedIn(BasePermission):
    def has_permission(self, request, view):
        print(request.user.is_anonymous)
        if str(request.user) == 'AnonymousUser':
            return False
        return True