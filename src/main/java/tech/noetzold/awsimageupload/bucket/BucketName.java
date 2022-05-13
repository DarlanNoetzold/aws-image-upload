package tech.noetzold.awsimageupload.bucket;

public enum BucketName {
    PROFILE_IMAGE("technoetzold-image-upload");

    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }
}
