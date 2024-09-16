import React from 'react'
import { Col}  from 'antd'
import { WrapperAccoutHeader, WrapperHeader, WrappertextHeader } from './style'
import Search from 'antd/es/transfer/search'
import {
  UserOutlined,
  DownOutlined
} from '@ant-design/icons';
const HeaderComponent = () => {
  return (
    <div>
    <WrapperHeader>
        <Col span={6}>
        <WrappertextHeader>tectecshop</WrappertextHeader>
        </Col>
        <Col span={12}>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          //onSearch={onSearch}
        />
        </Col>
        <Col span={6}>
        
        <WrapperAccoutHeader>
      
          <UserOutlined />
          <div>
          <span>Login/Logout</span>
          <div>
          <span>My Account</span>
          <DownOutlined />
          </div>
          </div>
          
        </WrapperAccoutHeader>
        </Col>
    </WrapperHeader>
    </div>
  )
}

export default HeaderComponent
