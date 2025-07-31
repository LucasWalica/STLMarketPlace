from rest_framework import serializers
from .models import STL, STLOnAlbum, STLNormalImage



class ImageSerialzer(serializers.ModelSerializer):
    
    class Meta:
        model = STLNormalImage
        fields = ["imageUrl"]


class STLSerializer(serializers.ModelSerializer):

    likes = serializers.IntegerField(read_only=True)
    downloads = serializers.IntegerField(read_only=True)

    class Meta:
        model = STL
        fields = [
            "name", "description", 
            "file_url", "category1", 
            "category2", "price",
            "likes", "downloads"
        ]
        extra_kwargs = {
            "category1": {"required": False, "allow_null": True},
            "category2": {"required": False, "allow_null": True},
            "price": {"required": False, "allow_null": True},
            "downloads": {"required":False, "allow_null":True},
            "likes":{"required":False, "allow_null":True}
        }

    def create(self, validated_data):
        user = self.context['request'].user
        image_urls = validated_data.pop("images", [])

        stl_instance = STL.objects.create(fkUser=user, **validated_data)
        
        for url in image_urls:
            STLNormalImage.objects.create(fkSTL=stl_instance, file_url=url)
        
        return stl_instance


class STLOnAlbumSerializer(serializers.ModelSerializer):
    model = STLOnAlbum
    fields = ["fkAlbum", "fkSTL"]

    def validate(self, data):
        user = self.context['request'].user
        stl = data['fkSTL']
        album = data['fkAlbum']

        if stl.fkUser != user:
            raise serializers.ValidationError("You do not own the STL.")
        
        if album.fkUser != user:
            raise serializers.ValidationError("You do not own the album.")

        return data
