import React from 'react'
import { List, ListItem, TextField, Grid, Typography, FormControlLabel, Radio, RadioGroup, Box, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table } from '@material-ui/core'
import CustomedPaper from '../../general/CustomedPaper'
import CheckBoxList from '../../general/CheckBoxList'
import NumberPlusMinus from '../../general/NumberPlusMinus'
import NumberFormat from 'react-number-format';
import { useSelector, useDispatch } from 'react-redux'

import { savePrices, validate } from '../../../reducers/upload'

const Margin = (props) => (<div style={{ margin: props.size }}></div>)
function NumberFormatCustom(props) {
    const { inputRef, onChange, defaultValue, ...other } = props;
    const [value, setValue] = React.useState(defaultValue)
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            value={value}
            onValueChange={(values) => {
                setValue(values.value)
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                        formattedValue: values.formattedValue
                    },
                });
            }}
            suffix=",000"
            thousandSeparator
            isNumericString
        />
    );
}
export default function Prices(props) {
    const defaultValue = useSelector(state => state.upload.prices)
    const dispatch = useDispatch()
    props.validateRef.current = () => validate(defaultValue, 'prices')
    const [prices, setPrices] = React.useState(
        {
            min: '',
            addition: '',
            minFormatted: '',
            additionFormatted: '',
        }
    )
    const inputRefs = React.useRef({
        min: null,
        addition: null
    })
    const handleChange = (event) => {
        console.log(event.target.value)
        defaultValue[event.target.name] = event.target.value
        setPrices({
            ...prices,
            [event.target.name]: event.target.value,
            [`${event.target.name}Formatted`]: event.target.formattedValue,
        });
    };

    React.useEffect(() => {
        return () => savePrices(defaultValue)(dispatch)
    }, [])

    return (
        <List>
            <ListItem>
                <CustomedPaper title="Giá mỗi đêm" shortDescription="Vui nhập giá mỗi đêm của quý đối tác cho chỗ nghỉ này.">
                    <Grid container >
                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography >Giá tối thiểu mỗi đêm là bao nhiêu?</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        value={prices.min}
                                        onChange={handleChange}
                                        name="min"
                                        id="min-price-input"
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                        inputProps={{
                                            defaultValue: defaultValue.min
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Margin size="20px" />
                                    <Typography >Thêm khách</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        value={prices.addition}
                                        onChange={handleChange}
                                        name="addition"
                                        id="addition-price-input"
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                        inputProps={{
                                            defaultValue: defaultValue.min
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Margin size="20px" />
                                    <Typography >Cho mỗi khách sau</Typography>
                                    <NumberPlusMinus inputProps={{ fullWidth: true, }} onChange={value => defaultValue.additionFrom = value} defaultValue={defaultValue.additionFrom ? defaultValue.additionFrom : 2} min={2} max={10} />
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Bảng tổng hợp */}
                        <Grid item xs={2} />
                        <Grid item xs={4}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Lượng khách</TableCell>
                                            <TableCell align="right">Giá</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="left">1</TableCell>
                                            <TableCell align="right">{prices.minFormatted !== '' ? prices.minFormatted : 0} VNĐ</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">2</TableCell>
                                            <TableCell align="right">{prices.additionFormatted !== '' ? prices.additionFormatted : 0} VNĐ</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </CustomedPaper>
            </ListItem >
            <ListItem>
                <CustomedPaper title="Hình thức thanh toán" shortDescription="Vui lòng chọn hình thức thanh toán">
                    <Grid container >
                        <Grid item xs={6}>
                            <List>
                                <ListItem>
                                    <RadioGroup defaultValue={defaultValue.paymentMethod} onChange={e => defaultValue.paymentMethod = e.target.value}>
                                        <FormControlLabel
                                            value="bank"
                                            control={
                                                <Radio />
                                            }
                                            labelPlacement="end"
                                            label="Chuyển khoản ngân hàng"
                                        />
                                        <FormControlLabel
                                            value="cod"
                                            control={
                                                <Radio />
                                            }
                                            labelPlacement="end"
                                            label="Thanh toán khi đến nơi"
                                        />
                                    </RadioGroup>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </CustomedPaper>
            </ListItem>
        </List >
    )
}
