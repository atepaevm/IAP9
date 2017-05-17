import * as React from 'react';

interface IndexHeaderProps {
    labnum : number;
    owners : string;
    variant : string;
}

export default class IndexHeader extends React.Component<IndexHeaderProps, any> {
    render(){
        return (
            <div className="menu" id="menu">
                <div className="container">
                    Лабораторная работа №{this.props.labnum}<br/>
                    {this.props.owners}<br/>
                    Вариант: {this.props.variant}
                </div>
            </div>

        );
    }
}