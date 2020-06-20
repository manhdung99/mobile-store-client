import React, {useEffect, useState} from 'react';
import {Button, Form, Row, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import {goBack} from 'connected-react-router';
import LoadingPage from "../../components/common/LoadingPage";
import {allUsersSelector, createUser, getUserById, updateUser} from "../../redux/AllUsersSlice";
import FormLayout from "../../components/common/FormLayout";
import UserRegisterInput from "../../components/FormInputs/UserRegisterInput";

const UserDetail = (props) => {
    //Hooks
    const dispatch = useDispatch();
    const {id} = useParams();

    //Init data Hook
    const [init, setInit] = useState(false);
    useEffect(() => {
        if (!init && id) {
            dispatch(getUserById(id));
            setInit(true);
        }
    });

    //Get Params
    const {action} = props;
    const selector = useSelector(allUsersSelector);

    //Local variables
    const readOnly = action === "VIEW";
    if (!selector.isFetching)
        console.log(selector);

    const onFinish = (values) => {
        console.log('props', props);
        console.log('values', values);
        switch (action) {
            case "CREATE":
                dispatch(createUser(values));
                break;
            case "UPDATE":
                dispatch(updateUser(values));
                break;
            default:
                console.log('Unreachable code');
        }
        dispatch(goBack());
    }

    let detailItem = selector.detailItem;


    if (action !== 'CREATE' && !detailItem) {
        console.log(action);
        return <LoadingPage/>;
    } else
        detailItem = {role: "salesman"}

    return (
        <FormLayout title="Đăng ký tài khoản">
            <Form
                initialValues={detailItem}
                labelCol={{span: 8}}
                labelAlign={"left"}
                wrapperCol={{span: 16}}
                onFinish={values => onFinish(values)}
            >
                <Row gutter={16}>
                    <UserRegisterInput span={12} readOnly={readOnly} action={action}/>
                </Row>
                <Row justify="end" style={{marginBottom: 0}}>
                    <Form.Item>
                        <Space style={{paddingLeft: "auto"}}>
                            <Button htmlType="button">
                                Làm mới
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Lưu lại
                            </Button>
                        </Space>
                    </Form.Item>
                </Row>
            </Form>
        </FormLayout>
    );
};

export default UserDetail;
