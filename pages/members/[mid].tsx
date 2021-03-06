import React from 'react';
import { connect } from 'react-redux';
import { withRouter, SingletonRouter } from 'next/router';
import { getMemberById } from '../../store/actions';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import QuestionBox from '../../components/QuestionBox';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from 'next/link';
import {
  TypeMemberTerms,
  TypeMemberData,
  TypeQuestionData,
  AppState,
  AppActions
} from '../../types';
import moment from 'moment';
import { Store } from 'redux';
import { ParsedUrlQuery } from 'querystring';
import { ThunkDispatch } from 'redux-thunk';

const MembersPage = ({
  member,
  questions
}: {
  member: TypeMemberData;
  questions: TypeQuestionData[];
}): JSX.Element => {
  if (!member)
    return (
      <div className="progress">
        <CircularProgress />
      </div>
    );

  return (
    <div>
      <Grid>
        <Card>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item md={2}>
                <Avatar
                  alt="Mp's image"
                  src={`/static/images/${member.gender.toLowerCase()}.png`}
                  className="membersImageLarge"
                />
              </Grid>
              <Grid item md={8}>
                <Grid container direction="row" justify="space-between">
                  <Grid>
                    <Typography variant="h5">{member.name}</Typography>
                    <Typography>Gender : {member.gender}</Typography>
                    {member.birthPlace ? (
                      <Typography>Birthplace : {member.birthPlace}</Typography>
                    ) : null}
                    {member.dob ? (
                      <Typography>
                        Age : {moment.unix(+member.dob / 1000).fromNow(true)}
                      </Typography>
                    ) : null}
                    {member.maritalStatus ? (
                      <Typography>
                        Marital Status : {member.maritalStatus}{' '}
                      </Typography>
                    ) : null}
                    {member.education ? (
                      <Typography>Education : {member.education}</Typography>
                    ) : null}
                    {member.profession && member.profession.length > 0 ? (
                      <Typography>
                        Profession : {member.profession.join(', ')}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid>
                    {member.email && member.email.length > 0 ? (
                      <List dense={true} className="contactList">
                        <ListSubheader>E-mail</ListSubheader>
                        {member.email.map((each: string, index: number) => (
                          <ListItem key={index}>
                            <a href={`mailto:${each}`} className="link">
                              <ListItemText primary={each} />
                            </a>
                          </ListItem>
                        ))}
                      </List>
                    ) : null}
                    {member.phone && member.phone.length > 0 ? (
                      <List dense={true} className="contactList">
                        <ListSubheader>Phone number</ListSubheader>
                        {member.phone.map((each: string, index: number) => (
                          <ListItem key={index}>
                            <a href={`tel:${each}`} className="link">
                              <ListItemText primary={each} />
                            </a>
                          </ListItem>
                        ))}
                      </List>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Card className="marginTopOne">
        <CardHeader title="Terms" />
        <CardContent>
          <Table className="table" aria-label="MP's terms">
            <TableHead>
              <TableRow>
                <TableCell>Constituency</TableCell>
                <TableCell>Party</TableCell>
                <TableCell>House</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {member.terms &&
                member.terms
                  .filter(
                    (term: TypeMemberTerms) =>
                      term.party && term.geography && term.house && term.session
                  )
                  .map((term: TypeMemberTerms) => (
                    <TableRow key={term.party.name}>
                      <TableCell>
                        <Link
                          href="/geographies/[gid]"
                          as={`/geographies/${term.geography.GID}`}
                        >
                          <a className="link">
                            {term.geography.name} ({term.geography.parent.name})
                          </a>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          href="/parties/[pid]"
                          as={`/parties/${term.party.PID}`}
                        >
                          <a className="link">
                            {term.party.name} ({term.party.abbr})
                          </a>
                        </Link>
                      </TableCell>
                      <TableCell>
                        {term.session}, {term.house.name}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="marginTopOne">
        <CardHeader
          title="Popular Questions"
          action={
            <Link href={`/search?member=${member.MID}`}>
              <Button>All Questions</Button>
            </Link>
          }
        />
        <CardContent>
          {questions ? (
            questions.map((question: TypeQuestionData) => (
              <div key={question.QID} className="marginBottomOne">
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

MembersPage.getInitialProps = async ({
  store,
  query
}: {
  store: Store<AppState>;
  query: ParsedUrlQuery;
}): Promise<void> => {
  const mid = +(query.mid as string);
  if (
    !store.getState().members[mid] ||
    !store.getState().members[mid].maritalStatus
  )
    await (store.dispatch as ThunkDispatch<AppState, undefined, AppActions>)(
      getMemberById(mid)
    );
};

const mapStateToProps = (
  state: AppState,
  props: {
    router: SingletonRouter;
  }
): {
  member: TypeMemberData;
  questions: TypeQuestionData[];
} => {
  const member = state.members[+(props.router.query.mid as string)];
  return {
    member: member,
    questions: member.popularQuestionIds
      ? member.popularQuestionIds.map((each: number) => state.questions[each])
      : []
  };
};
export default withRouter(connect(mapStateToProps)(MembersPage));
