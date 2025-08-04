from rest_framework import serializers
from .models import STL, STLOnAlbum, STLNormalImage



class ImageSerialzer(serializers.ModelSerializer):
    
    class Meta:
        model = STLNormalImage
        fields = ["file_url"]


class STLSerializer(serializers.ModelSerializer):
    fkUser = serializers.HiddenField(default=serializers.CurrentUserDefault())
    likes = serializers.IntegerField(read_only=True)
    downloads = serializers.IntegerField(read_only=True)

    # Para escribir imágenes al hacer POST/PUT
    write_images = serializers.ListField(
        child=serializers.URLField(),
        write_only=True,
        required=False
    )

    # Para leer imágenes al hacer GET
    images = serializers.SerializerMethodField()

    class Meta:
        model = STL
        fields = [
            "fkUser","name", "description",
            "file_url", "category1",
            "category2", "price",
            "likes", "downloads",
            "write_images", "images"
        ]
        extra_kwargs = {
            "category1": {"required": False, "allow_null": True},
            "category2": {"required": False, "allow_null": True},
            "price": {"required": False, "allow_null": True},
            "downloads": {"required": False, "allow_null": True},
            "likes": {"required": False, "allow_null": True},
        }

    def get_images(self, obj):
        return [img.file_url for img in obj.stlnormalimage_set.all()]

    def create(self, validated_data):
        image_urls = validated_data.pop("write_images", [])

        # No pongas fkUser otra vez aquí
        stl_instance = STL.objects.create(**validated_data)

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
