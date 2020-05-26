import React, { Component } from 'react'
import HsCard from './HomestayCard'
import { connect } from 'react-redux'
import { loadList } from '../../reducers/homestays'

export class HsList extends Component {
    componentDidMount() {
        this.props.loadList()
    }

    render() {
        let homestays = this.props.hlist.map(h => <HsCard context={h} />)
        return (
            <>
                <div className="card-deck">
                    {homestays[0]}
                    {homestays[1]}
                    {homestays[2]}
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                        </li>
                        <li className="page-item active"> <span className="page-link">
                            1
                            <span className="sr-only">(current)</span></span>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </>
        )
    }
}

const mapState2Props = state => ({
    hlist: state.homestays.list
})

export default connect(mapState2Props, { loadList })(HsList)
