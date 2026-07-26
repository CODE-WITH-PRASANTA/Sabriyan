import React from 'react'
import ContactBreadcrumb from '../../Component/ContactBreadcrumb/ContactBreadcrumb'
import MainContact from '../../Component/MainContact/MainContact'
import ContactTable from '../../Component/ContactTable/ContactTable'

const Contact = () => {
  return (
    <div>
        <ContactBreadcrumb />
        <MainContact />
        <ContactTable />
    </div>
  )
}

export default Contact