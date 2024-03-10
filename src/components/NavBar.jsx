import React, { useEffect, useRef, useState } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons'
import icon from '/images/cryptocurrency.png'

const NavBar = () => {
    const [active, setActive] = useState(false)
    const [screenSize, setScreenSize] = useState(window.innerWidth)
    const location = useLocation()
    const menuRef = useRef()
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        const handler = (e) => {
            if (screenSize<951 && menuRef.current && !menuRef.current.contains(e.target)) {
                setActive(false)
            }
        }
        window.addEventListener('resize', handleResize)
        window.addEventListener('mousedown', handler)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousedown', handler)
        }
    }, [active, menuRef])

    useEffect(() => {
        if (screenSize < 951) {
            setActive(false)
        } else {
            setActive(true)
        }
    }, [screenSize])

    const items = [{
        label: <Link to="/">Home</Link>,
        icon: <HomeOutlined />,
        key: '/'
    }, {
        label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
        icon: <FundOutlined />,
        key: '/cryptocurrencies'
    },
        , {
        label: <Link to="/exchanges">Exchanges</Link>,
        icon: <MoneyCollectOutlined />,
        key: '/exchanges'
    },
        , {
        label: <Link to="/news">News</Link>,
        icon: <BulbOutlined />,
        key: '/news'
    },
    ]
    return (
        <div className='nav-container'>
            <div className="logo-container">
                <Avatar src={icon} size='large' />
                <Typography.Title level={2} className='logo'>
                    <Link to='/'>Cryptoverse</Link>
                </Typography.Title>
                <Button className='menu-control-container' onClick={() => setActive(!active)}>
                    <MenuOutlined />
                </Button>
            </div>
            {active &&
                <div className='menu-parent' ref={menuRef}>
                    <Menu
                        theme='dark'
                        selectedKeys={[location.pathname]}
                        items={items}
                    />
                </div>
            }
        </div>
    );
};

export default NavBar;