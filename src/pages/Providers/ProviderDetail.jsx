import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Card, Space} from 'antd';
import AppLayout from "../../layouts/AppLayout";
import {useDispatch, useSelector} from "react-redux";
import {createProvider, deleteProvider, login, providersSelector, updateProvider} from "../../redux";
import {useParams, useLocation} from 'react-router-dom';
import {push} from 'connected-react-router';
import IF from "../../components/IF";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";

const ProviderDetail = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const pageState = location.state;

    //Config
    const readOnly = pageState.action === "view";
    const provider = pageState.payload;

    const onSubmit = () => {

    };

    return (
        <AppLayout>
            <Card
                title={
                    <Space>
                        <ArrowLeftOutlined />
                        <h3>Chi Tiết Nhà Cung Cấp</h3>
                    </Space>
                }>
                <Form
                    initialValues={provider}
                    labelCol={{span: 4}}
                    labelAlign={"left"}
                    wrapperCol={{span: 12}}
                    onFinish={(values) => {
                        if (pageState.action === "edit")
                            dispatch(updateProvider(values));
                        else if (pageState.action === "create") {
                            dispatch(createProvider(values));
                        }
                        dispatch(push('/providers'));

                    }}
                >
                    <IF condt={pageState.action !== 'create'}>
                        <Form.Item
                            label="ID"
                            name="id"
                        >
                            <Input readOnly={readOnly || pageState.action ==="edit"}/>
                        </Form.Item>
                    </IF>

                    <Form.Item
                        label="Tên Nhà Cung Cấp"
                        name="name"
                    >
                        <Input readOnly={readOnly}/>
                    </Form.Item>
                    <Form.Item
                        label="Số Điện Thoại"
                        name="phone"
                    >
                        <Input readOnly={readOnly}/>
                    </Form.Item>
                    <Form.Item
                        label="Địa Chỉ"
                        name="address"
                    >
                        <Input readOnly={readOnly}/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="button" style={{marginRight: "1em"}}>
                            Làm mới
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Lưu lại
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </AppLayout>
    );
};

export default ProviderDetail;