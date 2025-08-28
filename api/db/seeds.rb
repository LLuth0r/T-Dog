Facility.destroy_all
Court.destroy_all
Camera.destroy_all

f = Facility.create!(name: "Test Facility", slug: "test-facility")
c = f.courts.create!(name: "Court 1", slug: "court-1")
c.create_camera!(
  rtsp_url: "rtsp://example.invalid/stream1",
  onvif_url: "http://camera.invalid/onvif",
  make: "Reolink", model: "Dummy"
)

puts "Seeded: facility=#{f.id} court=#{c.id} camera=#{c.camera.id}"
