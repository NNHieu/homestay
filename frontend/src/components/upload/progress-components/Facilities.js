import React from 'react'
import { List, ListItem, TextField } from '@material-ui/core'
import CustomedPaper from '../../general/CustomedPaper'
import CheckBoxList from '../../general/CheckBoxList'

import { facilties_list } from '../../../reducers/upload'
import { useSelector, useDispatch } from 'react-redux'
import { UPLOAD_FACILITIES } from '../../../reducers/types'

function initRefCheckboxs() {
    const init = {}
    for (let k in facilties_list) {
        init[k] = new Array(facilties_list[k].list.length)
    }
    return init
}

export default function Facilities() {
    const refCheckboxs = React.useRef(initRefCheckboxs())
    const listFacilitiesComponents = []
    const defaults = useSelector(state => state.upload.facilities)
    const dispatch = useDispatch()

    React.useEffect(() => {
        return () => {
            for (let k in facilties_list) {
                for (let c in refCheckboxs.current[k]) {
                    defaults[k][c] = refCheckboxs.current[k][c].checked
                }
            }
            dispatch({
                type: UPLOAD_FACILITIES,
                payload: defaults
            })
        }
    }, [])

    for (let k in facilties_list) {
        let group = facilties_list[k]
        listFacilitiesComponents.push(
            <ListItem key={k}>
                <CustomedPaper title={group.title}>
                    <CheckBoxList options={group.list} refs={refCheckboxs.current[k]} defaults={defaults[k]} />
                </CustomedPaper>
            </ListItem>
        )
    }

    return (
        <List>
            {
                listFacilitiesComponents
            }
        </List>
    )
}
