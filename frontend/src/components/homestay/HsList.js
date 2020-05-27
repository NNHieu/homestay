import React, { Component } from 'react'
import PropTypes from 'prop-types'

import clsx from 'clsx'

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import HsCard from './HomestayCard'
import { connect } from 'react-redux'
import { loadList } from '../../reducers/homestays'

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});

class HsList extends Component {
    static propTypes = {
        children: PropTypes.node,
        classes: PropTypes.object.isRequired,
        className: PropTypes.string,
    };
    componentDidMount() {
        this.props.loadList()
    }

    render() {
        const { classes, children, className } = this.props
        let homestays = this.props.hlist.map(h =>
            <GridListTile key={h.id}>
                <HsCard hinfo={h} />
            </GridListTile>
        )
        console.log(homestays[0])
        return (
            <div className={clsx(classes.root, className)}>
                {homestays}
            </div>
        )
    }
}

const mapState2Props = state => ({
    hlist: state.homestays.list
})

export default withStyles(useStyles)(connect(mapState2Props, { loadList })(HsList))
