import React from 'react';
import {Link} from '../routes';
import web3 from '../libs/web3';
import Project from '../libs/project';
import ProjectList from '../libs/projectList';
import {Grid, Button, Typography, Card, CardContent, CardActions, LinearProgress} from '@material-ui/core';
import withRoot from '../libs/withRoot';
import Layout from "../components/Layout";

class Index extends React.Component {
    static async getInitialProps({req}) {
        //在这里修改summary, 数据获取部分
        const addressList = await ProjectList.methods.getProjects().call();
        const summaryList = await Promise.all(
            addressList.map(address =>
                Project(address)
                    .methods.getSummary()
                    .call())
        );

        console.log({summaryList});
        const projects = addressList.map((address, i) => {
            const [description, minInvest, maxInvest, goal, balance, investorCount, paymentCount, owner] = Object.values(summaryList[i]);
            return {
                address,
                description,
                minInvest,
                maxInvest,
                goal,
                balance,
                investorCount,
                paymentCount,
                owner,
            };
        });

        console.log(projects);

        return {projects};


    }


    render() {
        const {projects} = this.props;

        return (
            <Grid container spacing={16}>
                {projects.map(this.renderProject)}
            </Grid>
        );
    }

    //数据渲染部分
    renderProject(project) {
        const progress = project.balance / project.goal * 100;
        return (
            <Grid item md={4} key={project.address}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {project.description}
                        </Typography>

                        <LinearProgress color="primary" variant="determinate" value={progress} />

                        <Typography component="p"> {project.address}</Typography>
                    </CardContent>
                    <CardActions>
                        <Link route={`/projects/${project.address}`}>
                            <Button size="small" color="primary">
                                立即投资
                            </Button>
                        </Link>
                        <Link route={`projects/${project.address}`}>
                            <Button size="small" color="secondary">
                                查看详情
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
        );

    }
}

export default withRoot(Index);
