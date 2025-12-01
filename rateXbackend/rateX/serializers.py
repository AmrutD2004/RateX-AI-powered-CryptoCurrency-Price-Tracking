from rest_framework import serializers
from .models import * 


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'userName', 'password']
        extra_kwargs = {
    'password': {'write_only': True}
}

    def create(self, validated_data):

        user = User(
            userName = validated_data['userName'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
