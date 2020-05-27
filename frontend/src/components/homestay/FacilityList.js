/* eslint-disable no-use-before-define */

import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

import { toggleFacilityChecked, loadFacilities, getListSuggestFacility } from '../../reducers/facilities'
import { loadList } from '../../reducers/homestays'

class FacilitiesCheckboxesTags extends React.Component {

    static propTypes = {
        flist: PropTypes.array,
        loadFacilities: PropTypes.func.isRequired,
        toggleFacilityChecked: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.loadFacilities()
    }

    render() {
        console.log(this.props.flist)
        return (
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={this.props.flist}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                onChange={
                    (e, values) => {
                        this.props.toggleFacilityChecked(
                            values.map(value => value.fid),
                            this.props.loadList
                        )
                    }
                }
                renderOption={(option, { selected }) => {
                    return (
                        < React.Fragment >
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.title}
                        </React.Fragment >
                    )
                }
                }
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Facilities" placeholder="Includes" />
                )}
            />
        );
    }
}



const mapState2Props = state => ({
    flist: getListSuggestFacility(state),
})

export default connect(mapState2Props, { toggleFacilityChecked, loadFacilities, loadList })(FacilitiesCheckboxesTags)
