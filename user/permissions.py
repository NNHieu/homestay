from rest_framework import permissions


class IsVerified(permissions.BasePermission):
    message = "Account haven't been verified yet."

    def has_permission(self, request, view):
        return request.user and request.user.is_verify
