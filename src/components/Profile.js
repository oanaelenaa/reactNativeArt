import * as React from 'react';
import ScreenProps from './ScreenProps';
import autobind from 'autobind-decorator';
import Firebase from './Firebase';
export default class Profile extends Component {//<ScreenProps>{

    //s@autobind
    logout() {
        const { navigation } = this.props;
        Firebase.auth.signOut();

    }


}