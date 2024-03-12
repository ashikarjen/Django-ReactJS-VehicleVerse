from django.contrib import admin
from .models import CustomUser, Vehicle, Rental


admin.site.register(CustomUser)


class VehicleAdmin(admin.ModelAdmin):
    list_display = ('vehicle_type', 'make', 'model', 'year', 'phone_number', 'price')
    list_filter = ('vehicle_type', 'year', 'price')
    search_fields = ('user__username', 'make', 'model', 'year')

    def get_form(self, request, obj=None, **kwargs):
        # Limit choices for the 'user' field to the currently logged-in user
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['user'].queryset = CustomUser.objects.filter(username=request.user)
        return form

    def save_model(self, request, obj, form, change):
        # Set the 'user' field to the currently logged-in user
        if not obj.user:
            obj.user = request.user
        obj.save()

@admin.register(Vehicle)
class VehicleAdmin(VehicleAdmin):
    def get_queryset(self, request):
        # Limit the queryset to objects created by the currently logged-in user
        qs = super().get_queryset(request)
        if not request.user.is_superuser:
            qs = qs.filter(user=request.user)
        return qs


class RentalAdmin(admin.ModelAdmin):
    list_display = ('vehicle_type', 'phone_number', 'model', 'is_available')
    list_filter = ('vehicle_type', 'is_available')
    search_fields = ('user__username', 'model')

    def get_form(self, request, obj=None, **kwargs):
        # Limit choices for the 'user' field to the currently logged-in user
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['user'].queryset = CustomUser.objects.filter(username=request.user)
        return form

    def save_model(self, request, obj, form, change):
        # Set the 'user' field to the currently logged-in user
        if not obj.user:
            obj.user = request.user
        obj.save()

@admin.register(Rental)
class RentalAdmin(RentalAdmin):
    def get_queryset(self, request):
        # Limit the queryset to objects created by the currently logged-in user
        qs = super().get_queryset(request)
        if not request.user.is_superuser:
            qs = qs.filter(user=request.user)
        return qs
