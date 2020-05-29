import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List, ListItem, Typography, Grid, Divider, RadioGroup, FormControlLabel, Radio, Box } from '@material-ui/core'
import CustomedPaper, { CustomedPaperWithCheckBoxs } from '../../general/CustomedPaper'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import NumberPlusMinus from '../../general/NumberPlusMinus'
import { Margin } from '../../general/Margin'


export default function ReservationDate(props) {
    const [alignment, setAlignment] = React.useState('left');
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <List>
            <ListItem>
                <CustomedPaper title="Khách hàng có thể đặt nơi ở của bạn trước bao lâu?">
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="left" aria-label="left aligned">
                            Mọi lúc
                        </ToggleButton>
                        <ToggleButton value="center" aria-label="centered">
                            1 năm
                        </ToggleButton>
                        <ToggleButton value="right" aria-label="right aligned">
                            6 tháng
                        </ToggleButton>
                        <ToggleButton value="justify" aria-label="justified">
                            3 tháng
                        </ToggleButton>
                    </ToggleButtonGroup>
                </CustomedPaper>
            </ListItem>
            <ListItem>
                <CustomedPaper title="Thời gian tối thiểu cho mỗi lần đặt">
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography >Số đêm tối thiểu cho mỗi lần đặt</Typography>
                            <NumberPlusMinus inputProps={{ fullWidth: true }} defaultValue={1} min={1} max={10} />
                        </Grid>
                        <Grid item xs={12}>
                            <Margin size="20px" />
                            <Typography >Số đêm tối đa cho mỗi lần đặt</Typography>
                            <NumberPlusMinus inputProps={{ fullWidth: true }} defaultValue={0} min={0} max={10} />
                        </Grid>
                    </Grid>
                </CustomedPaper>
            </ListItem>
            <ListItem>
                <CustomedPaperWithCheckBoxs
                    title="Ngày có phòng"
                    options={
                        [
                            { value: "anytime", mainText: "Bất kì lúc nào " },
                            { value: "exclude", mainText: "Không thể đặt nơi ở của tôi vào một số ngày cụ thể.", subText: "Bấm chọn từng ngày để khóa trên trên lịch của bạn" },
                            { value: "add-after", mainText: "Tôi sẽ thêm lượng phòng trống sau" },
                        ]
                    }
                />
            </ListItem>
            <ListItem>
                <CustomedPaperWithCheckBoxs
                    title="Chính sách hủy phòng"
                    options={
                        [
                            {
                                value: "dynamic", mainText: "Linh hoạt",
                                subText: "Khách hàng hủy trước ngày nhận phòng 1 ngày sẽ được hoàn lại tiền 100%. \
                            Trong trường hợp khách không đến bạn được nhận 100% tiền đặt phòng" },
                            {
                                value: "constrain", mainText: "Trung bình", subText: "Khách hàng hủy trước ngày nhận phòng 5 ngày sẽ được hoàn lại tiền 100%. \
                            Trong trường hợp khách không đến bạn được nhận 100% tiền đặt phòng" },
                            {
                                value: "strict", mainText: "Nghiêm ngặt", subText: "Khách hàng hủy trước ngày nhận phòng 7 ngày sẽ được hoàn lại tiền 50%. \
                            Trong trường hợp khách không đến bạn được nhận 100% tiền đặt phòng" },
                        ]
                    }
                />
            </ListItem>

        </List>
    )
}

// ReservationDate.propTypes = {
//     prop: PropTypes
// }

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(ReservationDate)
