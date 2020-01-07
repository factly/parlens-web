import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import QuestionBox from '../../components/QuestionBox';
import { getGeographyById } from '../../store/actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  TypeGeographyMember,
  TypeGeographyData,
  TypeQuestionData
} from '../../types';
import { AppState } from '../../store/reducers';

const MapWithNoSSR = dynamic(() => import('../../components/Maps'), {
  ssr: false
});

const useStyles = makeStyles((theme: Theme) => ({
  marginBottomOne: {
    marginBottom: theme.spacing(1)
  },
  map: {
    margin: 0,
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  progress: {
    marginLeft: '50%'
  }
}));

const GeographyPage = ({
  geography,
  questions
}: {
  geography: TypeGeographyData;
  questions: TypeQuestionData[];
}): JSX.Element => {
  const classes = useStyles();

  if (!geography) {
    return (
      <div className={classes.progress}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      <Card>
        <CardHeader title={geography.name} />
        {geography.type === 'constituency' ? (
          <CardContent className={classes.map}>
            <MapWithNoSSR geographyId={geography.GID} />
          </CardContent>
        ) : null}
      </Card>
      <Card className="marginTopOne">
        <CardHeader
          title={`MP's from ${geography.name} (${geography.parent.name})`}
        />
        <CardContent className={classes.root}>
          <Table className="table" aria-label="list of MP's">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Party</TableCell>
                <TableCell>House</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {geography.members.map(
                (member: TypeGeographyMember, index: number) => (
                  <TableRow key={member.MID + index}>
                    <TableCell>
                      <Link href="/members/[mid]" as={`/members/${member.MID}`}>
                        <a className="link">
                          <div className="flexDisplay">
                            <Avatar
                              alt="Mp's image"
                              src="/static/images/mp.jpg"
                            />
                            <div className="paddingOnLeft">{member.name}</div>
                          </div>
                        </a>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href="/parties/[pid]"
                        as={`/parties/${member.terms[0].party.PID}`}
                      >
                        <a className="link">
                          {member.terms[0].party.name} (
                          {member.terms[0].party.abbr})
                        </a>
                      </Link>
                    </TableCell>
                    <TableCell>
                      {member.terms[0].session}, {member.terms[0].house.name}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="marginTopOne">
        <CardHeader
          title="Questions"
          action={
            <Link href={`/search?constituency=${geography.GID}`}>
              <Button>All Questions</Button>
            </Link>
          }
        />
        <CardContent>
          {questions ? (
            questions.map((question: TypeQuestionData) => (
              <div key={question.QID} className={classes.marginBottomOne}>
                <QuestionBox question={question} />
              </div>
            ))
          ) : (
            <p> No questions </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

GeographyPage.getInitialProps = async ({
  store,
  query
}: any): Promise<void> => {
  if (!store.getState().geographies[+query.gid])
    await store.dispatch(getGeographyById(+query.gid));
};

const mapStateToProps = (
  state: AppState,
  props: any
): { geography: TypeGeographyData; questions: TypeQuestionData[] } => {
  const geography = state.geographies[+props.router.query.gid];
  return {
    geography: geography,
    questions:
      geography && geography.popularQuestionIds
        ? geography.popularQuestionIds.map(
            (each: number) => state.questions[each]
          )
        : []
  };
};

export default withRouter(connect(mapStateToProps)(GeographyPage));
