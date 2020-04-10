import React from 'react'
import { ProvideName } from '../room-pages/provide-name'

const UpdateName: React.FunctionComponent<{}> = () => (
  <ProvideName onSuccess={() => history.go(-1)} />
)

export default UpdateName
