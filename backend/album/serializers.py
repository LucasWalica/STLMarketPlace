from rest_framework import serializers
from .models import Album

class AlbumSerializer(serializers.ModelSerializer):

    downloads = serializers.IntegerField(read_only=True)
    likes = serializers.IntegerField(read_only=True) 

    class Meta:
        model = Album
        fields = ["name", "description", "price", "downloads", "likes"] 


    def create(self, validated_data):
        user = self.context["request"].user 
        return Album.objects.create(fkUser=user, **validated_data)