import React from 'react'
import { List, ListItem, TextField } from '@material-ui/core'
import CustomedPaper from '../../general/CustomedPaper'
import CheckBoxList from '../../general/CheckBoxList'


const basicFacilities = [
    { title: "máy điều hòa", id: 100 },
    { title: "tivi", id: 101 },
    { title: "internet miễn phí", id: 102 },
    { title: "bộ ga giường", id: 103 },
    { title: "máy sấy tóc", id: 104 },
    { title: "truyền hình cáp", id: 105 },
    { title: "máy giặt", id: 106 },
    { title: "khăn các loại", id: 107 },
]

const comfortFacilities = [
    { title: "lối vào riêng", id: 200 },
    { title: "thang máy trong tòa nhà", id: 201 },
    { title: "xe lăn vào được", id: 202 },
    { title: "chuông/liên lạc không dây", id: 203 },
    { title: "nhân viên trực cửa", id: 204 },
]

export default function Facilities() {
    return (
        <List>
            <ListItem>
                <CustomedPaper title="Tiện nghi thiết yếu">
                    <CheckBoxList options={basicFacilities} />
                </CustomedPaper>
            </ListItem>
            <ListItem>
                <CustomedPaper title="Sự thoải mái">
                    <CheckBoxList options={comfortFacilities} />
                </CustomedPaper>
            </ListItem>
        </List>
    )
}
