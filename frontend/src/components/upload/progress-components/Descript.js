import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { List, ListItem, TextField } from '@material-ui/core'
import CustomedPaper from '../../general/CustomedPaper'
import SimpleRating from '../../general/Rating'

//Reducers
import { saveDescription } from '../../../reducers/upload'

const hintDescription = `Ví dụ:
- Cách phương tiện công cộng 5 phút đi bộ 
- Phù hợp cho gia đình
- Không gian thoáng đãng với tầm nhìn đẹp tràn ngập ánh sáng tự nhiên`
const multilineTextField = {
    fullWidth: true,
    multiline: true,
    rows: "4",
    variant: "outlined",
    InputLabelProps: {
        shrink: true
    },
    placeholder: hintDescription,
    margin: "normal"
}
export default function Descript() {
    const state = useSelector(state => state.upload.description)
    const dispatch = useDispatch()
    const handleInputChange = (value, name) => {
        console.log(value)
        console.log(name)
        state[name] = value
        saveDescription(state)(dispatch)
    }
    return (
        <List>
            <ListItem>
                <CustomedPaper title="Đặt tên">
                    <TextField
                        variant="outlined"
                        name='name'
                        placeholder="Ví dụ: Romantic beach getaway"
                        fullWidth
                        onChange={e => handleInputChange(e.target.value, "name")}
                        value={state.name}
                    ></TextField>
                </CustomedPaper>
            </ListItem>
            {
                [
                    { title: "Miêu tả căn hộ của bạn", name: 'desc' },
                    { title: "Gợi ý vui chơi ăn uống tại địa phương (tùy chọn)", name: 'suggest' },
                    { title: "Quy định trong nhà (tùy chọn)", name: 'houserules' },
                    { title: "Làm thế nào để tìm đến chỗ bạn", name: 'howtofind' },

                ].map(line => (
                    <ListItem key={line.title}>
                        <CustomedPaper title={line.title}>
                            <TextField {...multilineTextField} value={state[line.name]} onChange={e => handleInputChange(e.target.value, line.name)} />
                        </CustomedPaper>
                    </ListItem>
                ))
            }
            <ListItem>
                <CustomedPaper title="Xếp hạng sao" shortDescription="Đánh giá để giúp khách hàng hình dung cụ thể hơn về nơi ở của bạn">
                    <SimpleRating name='ownerrate' onChange={handleInputChange} value={state.ownerrate} />
                </CustomedPaper>
            </ListItem>
        </List>
    )
}
