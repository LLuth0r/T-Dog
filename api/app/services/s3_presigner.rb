# This class provides a utility method to generate a presigned URL to
# download files from an Amazon S3 bucket, without needing AWS credentials.
# It has a limited time validity.

class S3Presigner
  def self.client
    @client ||= Aws::S3::Client.new(region: ENV['AWS_REGION'])
  end

  def self.presigner
    @presigner ||= Aws::S3::Presigner.new(client: client)
  end

  def self.presign_download(key, expires_in: 3600)
    presigner.presigned_url(:get_object, bucket: ENV['S3_BUCKET'], key: key, expires_in: expires_in)
  end