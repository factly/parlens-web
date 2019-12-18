import * as React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CheckBoxFilter from '../../components/CheckBoxFilter';
import AgeFilter from '../../components/AgeFilter';
import SelectedFilters from '../../components/SelectedFilters';
import QuestionBox from '../../components/QuestionBox';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { selectedActions, getStates } from '../../store/actions';
import { AppState } from '../../store/reducers/index';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import {
  typeFilter,
  typeQuestionBox,
  typeSelected,
} from '../../types';
import { CardMedia, Typography } from '@material-ui/core';
import {
  getSearchPageQuestions,
  getAllPartyIds
} from '../../store/actions';
import TermsFilter from '../../components/TermsFilter';

interface Iprops {
  dispatch: any;
  selected: typeSelected;
  questions: typeQuestionBox[];
  total: number;
  filters: typeFilter;
}

const SearchPage = ({
  dispatch,
  selected,
  questions,
  total,
  filters
}: Iprops): JSX.Element => {
  React.useEffect(() => {
    let counter = 0;
    if (selected.page) counter++;
    if (selected.sort) counter++;
    if (Object.keys(selected).length - counter > 0) {
      const queryEducation: string[] = [];
      const queryMaritalStatus: string[] = [];
      const queryParty: number[] = [];
      let queryGender: any = null;
      const queryState:number[] = []
      selected.party.forEach((element: number) => {
        const temp = filters.education.find(
          (each: { id: number; name: string }) => each.id === element
        );
        if (temp) {
          queryParty.push(temp.id);
        }
      });
      selected.state.forEach((element: number) => {
        const temp = filters.state.find(
          (each: { id: number; name: string }) => each.id === element
        );
        if (temp) {
          queryState.push(temp.id);
        }
      });
      selected.education.forEach((element: number) => {
        const temp = filters.education.find(
          (each: { id: number; name: string }) => each.id === element
        );
        if (temp) {
          queryEducation.push(temp.name);
        }
      });
      selected.marital.forEach((element: number) => {
        const temp = filters.marital.find(
          (each: { id: number; name: string }) => each.id === element
        );
        if (temp) {
          queryMaritalStatus.push(temp.name);
        }
      });
      if (selected.gender.length === 1) {
        const temp = filters.gender.find(
          (each: { id: number; name: string }) => each.id === selected.gender[0]
        );
        if (temp) queryGender = temp.name;
      }
      dispatch(
        getSearchPageQuestions({
          sort: selected.sort,
          page: selected.page,
          q: selected.q,
          education: queryEducation,
          marital_status: queryMaritalStatus,
          gender: queryGender ? (queryGender as string) : undefined,
          terms: selected.terms > 0 ? selected.terms : undefined,
          questionBy: selected.questionBy,
          geography : selected.geography.concat(queryState),
          party: selected.party
        })
      );
    } else Router.push('/');
  }, [selected]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
        <CheckBoxFilter
          limit={5}
          search
          defaultShow
          heading="State"
          list={filters.state}
          toogle={(value) => dispatch(selectedActions.toogle(value, 'state'))}
          selected={selected.state}
        />  
        <CheckBoxFilter
          limit={5}
          search
          defaultShow
          heading="Party"
          list={filters.party}
          toogle={(value) => dispatch(selectedActions.toogle(value, 'party'))}
          selected={selected.party}
        />
        <CheckBoxFilter
          limit={filters.education.length}
          heading="Education"
          list={filters.education}
          toogle={value => dispatch(selectedActions.toogle(value, 'education'))}
          selected={selected.education}
        />
        <AgeFilter
          heading="Age"
          selected={selected.age}
          toogle={(event, value) =>
            dispatch(selectedActions.setAge(value as number[]))
          }
        />
        <CheckBoxFilter
          limit={filters.marital.length}
          heading="Marital"
          list={filters.marital}
          toogle={value => dispatch(selectedActions.toogle(value, 'marital'))}
          selected={selected.marital}
        />
        <CheckBoxFilter
          limit={filters.gender.length}
          heading="Gender"
          list={filters.gender}
          toogle={value => dispatch(selectedActions.toogle(value, 'gender'))}
          selected={selected.gender}
        />
        <TermsFilter
          heading="Terms"
          selected={selected.terms}
          toogle={(event, value) =>
            dispatch(selectedActions.setTerms(value as number))
          }
        />
      </Grid>
      <Grid item xs={12} sm={4} md={7} lg={7} xl={8}>
        <Card>
          <CardHeader
            title="Questions"
            action={
              <Select
                value={selected.sort}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
                  dispatch(
                    selectedActions.setSort(event.target.value as string)
                  )
                }
                displayEmpty
                disableUnderline
                name="sorting"
              >
                <MenuItem value="newest">New</MenuItem>
                <MenuItem value="oldest">Old</MenuItem>
              </Select>
            }
          />
          <CardContent>
            <Table>
              <TableBody>
                {questions && questions.length > 0
                  ? questions.map((question: typeQuestionBox) => (
                      <TableRow key={question.QID}>
                        <TableCell>
                          <QuestionBox question={question} />
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10]}
                    count={total}
                    rowsPerPage={10}
                    page={total ? selected.page - 1 : 0}
                    onChangePage={(event, newPage: number) =>
                      dispatch(selectedActions.setPage(newPage + 1))
                    }
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

interface StateProps {
  filters: typeFilter;
  selected: typeSelected;
  questions: typeQuestionBox[];
  total: number;
}

SearchPage.getInitialProps = async ({ store, query }: any) => {
  await store.dispatch(getAllPartyIds());
  await store.dispatch(getStates())
  await store.dispatch(selectedActions.setAll(query));
};

const mapStateToProps = (state: AppState): StateProps => ({
  filters: state.filters,
  selected: state.selected,
  questions: state.search.qids.map((each: number) => state.questions[each]),
  total: state.search.total
});

export default connect(mapStateToProps)(SearchPage);
