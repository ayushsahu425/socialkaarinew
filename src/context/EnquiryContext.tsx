import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { ServiceOption } from '../data/content'

export interface Enquiry {
  option: ServiceOption
  service: string
  /** Changes on every request so the form reacts even to the same service twice. */
  nonce: number
}

interface EnquiryContextValue {
  enquiry: Enquiry | null
  requestEnquiry: (option: ServiceOption, service: string) => void
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null)

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null)

  const requestEnquiry = useCallback((option: ServiceOption, service: string) => {
    setEnquiry({ option, service, nonce: Date.now() })
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const value = useMemo(() => ({ enquiry, requestEnquiry }), [enquiry, requestEnquiry])
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEnquiry(): EnquiryContextValue {
  const ctx = useContext(EnquiryContext)
  if (!ctx) throw new Error('useEnquiry must be used inside <EnquiryProvider>')
  return ctx
}
