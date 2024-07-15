export interface OnUserCreateModel {
  data: Data
  object: string
  type: string
}

interface Data {
  data: Data2
  delivered_by_clerk: boolean
  from_phone_number: string
  id: string
  message: string
  object: string
  phone_number_id: string
  slug: string
  status: string
  to_phone_number: string
  user_id: string
}

interface Data2 {
  app: App
  otp_code: string
  user: User
}

interface App {
  domain_name: string
  logo_image_url: string
  logo_url: unknown
  name: string
  url: string
}

interface User {
  public_metadata: unknown
  public_metadata_fallback: string
}