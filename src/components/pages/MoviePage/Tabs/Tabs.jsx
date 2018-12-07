import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import MovieDetail from "./MovieDetail"
import MovieVideos from "./MovieVideos"
import MovieCredits from "./MovieCredits"
// import { Switch, Route } from 'react-router'
import { Link, Route, Switch } from "react-router-dom";



export default class Tabs extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <div className="mt-5">
                <Nav tabs>
                    <NavItem>
                        <Link to={`/movie/${this.props.id}/movie-detail`}>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                                tag="div"

                            >
                                MovieDetail
                            </NavLink>
                        </Link>

                    </NavItem>
                    <NavItem>
                        <Link to={`/movie/${this.props.id}/videos`}>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                                tag="div"
                            >
                                MovieVideos
                            </NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to={`/movie/${this.props.id}/movie-credits`}>

                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); }}
                                tag="div"
                            >
                                MovieCredits
                            </NavLink>
                        </Link>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    {/* <Switch> */}
                    <TabPane tabId={this.state.activeTab}>
                        <Row>
                            <Col sm="12">
                                <Switch>
                                    <Route
                                        path='/movie/:id/movie-detail'
                                        render={(props) => <MovieDetail {...props} id={this.props.id} item={this.props.item} />}
                                    />
                                    <Route
                                        path='/movie/:id/videos'
                                        render={(props) => <MovieVideos {...props} id={this.props.id} />}
                                    />
                                    <Route
                                        path='/movie/:id/movie-credits'
                                        render={(props) => <MovieCredits {...props} id={this.props.id} />}
                                    />
                                </Switch>
                            </Col>
                        </Row>
                    </TabPane>


                    {/* <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <Route
                                    path='/movie/:id/movie-detail'
                                    render={(props) => <MovieDetail {...props} id={this.props.id} item={this.props.item} />}
                                />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <Route
                                    path='/movie/:id/videos'
                                    render={(props) => <MovieVideos {...props} id={this.props.id} />}
                                />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                <Route
                                    path='/movie/:id/movie-credits'
                                    render={(props) => <MovieCredits {...props} id={this.props.id} />}
                                />
                            </Col>
                        </Row>
                    </TabPane> */}
                    {/* </Switch> */}
                </TabContent>

            </div>
        );
    }
}