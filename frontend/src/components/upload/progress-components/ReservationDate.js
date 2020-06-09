import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector, useDispatch } from 'react-redux'
import { List, ListItem, Typography, Grid, Divider, RadioGroup, FormControlLabel, Radio, Box } from '@material-ui/core'
import CustomedPaper, { CustomedPaperWithCheckBoxs } from '../../general/CustomedPaper'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import NumberPlusMinus from '../../general/NumberPlusMinus'
import { Margin } from '../../general/Margin'
import { saveReservationDate, validate } from '../../../reducers/upload'
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './ReservationDate.css'



class SelectMultibleCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
            selectedDays: props.defaul ? props.defaul : [],
        };
    }

    handleDayClick(day, { selected }) {
        const { selectedDays } = this.state;
        if (selected) {
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            selectedDays.splice(selectedIndex, 1);
        } else {
            selectedDays.push(day);
        }
        this.setState({ selectedDays });
    }

    componentWillUnmount() {
        this.props.onUnmount(this.state.selectedDays)
    }

    render() {
        return (
            <div>
                <DayPicker
                    disabledDays={{
                        before: new Date()
                    }}
                    selectedDays={this.state.selectedDays}
                    onDayClick={this.handleDayClick}
                />
            </div>
        );
    }
}

export default function ReservationDate(props) {
    const defaultValue = useSelector(state => state.upload.reservationDate)
    const dispatch = useDispatch()
    props.validateRef.current = () => validate(defaultValue, 'reservationDate')


    const [preTime, setPreTime] = React.useState(defaultValue.preTime);
    const handlePreTime = (event, newValue) => {
        defaultValue.preTime = newValue
        setPreTime(newValue);
    };

    const [showCalendar, setshowCalendar] = React.useState(defaultValue.availableDate === 'exclude')
    React.useEffect(() => () => saveReservationDate(defaultValue)(dispatch), [])

    const calendar = <div>
        <SelectMultibleCalendar
            // onDayClick={handleDayClick}/
            defaul={defaultValue.excludeDays}
            onUnmount={selected => defaultValue.excludeDays = selected}
        />
    </div>
    return (
        <List>
            <ListItem>
                <CustomedPaper title="Khách hàng có thể đặt nơi ở của bạn trước bao lâu?">
                    <ToggleButtonGroup
                        value={preTime}
                        exclusive
                        onChange={handlePreTime}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="anytime" aria-label="left aligned">
                            Mọi lúc
                        </ToggleButton>
                        <ToggleButton value="one_year" aria-label="centered">
                            1 năm
                        </ToggleButton>
                        <ToggleButton value="six_months" aria-label="right aligned">
                            6 tháng
                        </ToggleButton>
                        <ToggleButton value="three_months" aria-label="justified">
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
                            <NumberPlusMinus inputProps={{ fullWidth: true }} onChange={value => defaultValue.minNight = value} defaultValue={defaultValue.minNight} min={1} max={10} />
                        </Grid>
                        <Grid item xs={12}>
                            <Margin size="20px" />
                            <Typography >Số đêm tối đa cho mỗi lần đặt</Typography>
                            <NumberPlusMinus inputProps={{ fullWidth: true }} onChange={value => defaultValue.maxNight = value} defaultValue={defaultValue.maxNight} min={0} max={10} />
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
                    onChange={e => {
                        setshowCalendar(e.target.value === 'exclude')
                        defaultValue.availableDate = e.target.value
                    }}
                    defaultValue={defaultValue.availableDate}
                />
                {
                    showCalendar &&
                    calendar
                }
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
                    onChange={e => defaultValue.cancel = e.target.value}
                    defaultValue={defaultValue.cancel}
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
