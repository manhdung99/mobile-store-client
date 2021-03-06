import React, {useEffect, useState} from "react";
import DataTable from "../../components/common/DataTable";
import {useDispatch, useSelector} from "react-redux";
import {deleteProvider, getProviderById, providerSelector, searchProvider} from "../../redux";
import {sort} from "../../utils/sort";
import {generateKey} from "../../utils/ObjectUtils";
import LoadingPage from "../../components/common/LoadingPage";

const ProviderList = (props) => {
    //Data Hook
    const dispatch = useDispatch();
    const selector = useSelector(providerSelector);
    const [init, setInit] = useState(false);
    useEffect(() => {
        if (!init) {
            dispatch(searchProvider());
            setInit(true);
        }
    });

    if (selector.isFetching)
        return <LoadingPage/>

    return (
        <React.Fragment>
            <DataTable
                columns={[
                    {
                        title: "ID",
                        key: "id",
                        dataIndex: "id",
                        sorter: sort('id')
                    },
                    {
                        title: "Tên nhà cung cấp",
                        key: "name",
                        dataIndex: "name",
                        sorter: sort('name')
                    },
                    {
                        title: "Số điện thoại",
                        key: "phone",
                        dataIndex: "phone",
                        sorter: sort('phone')
                    },
                    {
                        title: "Địa chỉ",
                        key: "address",
                        dataIndex: "address",
                        sorter: sort('address')
                    },
                ]}
                dataSource={generateKey(selector.providers)}
                defaultSearchField="name"
                resourceName={"providers"}
                deleteAC={deleteProvider}
                searchAC={searchProvider}
                getDetailObjectAC={getProviderById}
                title="Danh sách nhà cung cấp"
                onSearch={(values) => dispatch(searchProvider(values))}
                onReload={() => dispatch(searchProvider())}
            />
        </React.Fragment>
    );
};

export default ProviderList;
