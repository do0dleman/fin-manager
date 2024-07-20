export default interface OnUserCreateModel {
  data: Data
  event_attributes: EventAttributes
  object: string
  type: string
}

interface Data {
  backup_code_enabled: boolean
  banned: boolean
  create_organization_enabled: boolean
  created_at: number
  delete_self_enabled: boolean
  email_addresses: EmailAddress[]
  external_accounts: ExternalAccount[]
  external_id: unknown
  first_name: string
  has_image: boolean
  id: string
  image_url: string
  last_active_at: number
  last_name: string
  last_sign_in_at: unknown
  locked: boolean
  lockout_expires_in_seconds: unknown
  mfa_disabled_at: unknown
  mfa_enabled_at: unknown
  object: string
  passkeys: unknown[]
  password_enabled: boolean
  phone_numbers: unknown[]
  primary_email_address_id: string
  primary_phone_number_id: unknown
  primary_web3_wallet_id: unknown
  private_metadata: unknown
  profile_image_url: string
  public_metadata: unknown
  saml_accounts: unknown[]
  totp_enabled: boolean
  two_factor_enabled: boolean
  unsafe_metadata: unknown
  updated_at: number
  username: string
  verification_attempts_remaining: number
  web3_wallets: unknown[]
}

interface EmailAddress {
  created_at: number
  email_address: string
  id: string
  linked_to: LinkedTo[]
  object: string
  reserved: boolean
  updated_at: number
  verification: Verification
}

export interface LinkedTo {
  id: string
  type: string
}

export interface Verification {
  attempts: unknown
  expire_at: unknown
  status: string
  strategy: string
}

export interface ExternalAccount {
  approved_scopes: string
  avatar_url: string
  created_at: number
  email_address: string
  first_name: string
  id: string
  identification_id: string
  image_url: string
  label: unknown
  last_name: string
  object: string
  provider: string
  provider_user_id: string
  public_metadata: unknown
  updated_at: number
  username: string
  verification: Verification2
}

export interface Verification2 {
  attempts: unknown
  expire_at: number
  status: string
  strategy: string
}

export interface EventAttributes {
  http_request: HttpRequest
}

export interface HttpRequest {
  client_ip: string
  user_agent: string
}
