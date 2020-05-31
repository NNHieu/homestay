import React from 'react'
import { Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Container from '@material-ui/core/Container'

import MainFeaturedPost from './homestay/MainFeaturePost'
import Gallery from './general/gallery'
import { SmallChips } from './general/ChipList'

//Actions
import { loadFacilities, getFacilitiesFromHomestay } from '../reducers/facilities'
import { loadDetail } from '../reducers/homestay'
import { detailLocation } from '../utils/location'

export default function Detail(props) {
    const hid = props.match.params.hid//homestay id
    const hdetail = useSelector(state => state.homestay.detail)
    let flist = useSelector(state => getFacilitiesFromHomestay(hdetail)(state))
    const dispatch = useDispatch()
    let imageList = useSelector(state => {
        const hdetail = state.homestay.detail
        if (hdetail) {
            return hdetail.images.map(
                img => ({
                    img: img.url, title: img.title,
                    author: "unknown", feature: true
                })
            )
        }
    })
    React.useEffect(() => {
        console.log('In use effect')
        console.log(hdetail)
        loadDetail(hid)(dispatch)
        loadFacilities()(dispatch)
    }, [])
    return (
        <Container maxWidth="lg">
            {/* <Header title="Blog" sections={sections} /> */}
            <main>
                {
                    hdetail && <MainFeaturedPost post={{
                        image: hdetail.images[0].url, title: hdetail.title,
                        description: hdetail.description,
                    }} />
                }
                {
                    flist && <SmallChips chipList={flist.map(f => f.name)} />
                }
                {
                    imageList && <Gallery tileData={imageList} />
                }

                {/* <Grid container spacing={4}>
                    {featuredPosts.map((post) => (
                        <FeaturedPost key={post.title} post={post} />
                    ))}
                </Grid>
                <Grid container spacing={5} className={classes.mainGrid}>
                    <Main title="From the firehose" posts={posts} />
                    <Sidebar
                        title={sidebar.title}
                        description={sidebar.description}
                        archives={sidebar.archives}
                        social={sidebar.social}
                    />
                </Grid> */}
            </main>
        </Container>

    )
}