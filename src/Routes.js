import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import Explorepage from './pages/Explorepage';
import Notificationspage from './pages/Notificationspage';
import Messagespage from './pages/Messagespage';
import Bookmarkspage from './pages/Bookmarkspage';
import Listspage from './pages/Listspage';
import Profilepage from './pages/Profilepage';

const lists = [
    { component: Homepage, link: "/home"},
    { component: Explorepage, link: "/explore"},
    { component: Notificationspage, link: "/notifications"},
    { component: Messagespage, link: "/messages"},
    { component: Bookmarkspage, link: "/bookmark"},
    { component: Listspage, link: "/list"},
    { component: Profilepage, link: "/profile"},
];

const Routes = () => {
    return(
        <switch>
            <Route exact path="/" component={Homepage} />
            {lists.map((list) => (
                <Route exact path={list.link} component={list.component} />
            ))}
        </switch>
    )
}

export default Routes





