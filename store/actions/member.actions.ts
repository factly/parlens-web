import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { questionConstants } from '../constants';
import {
  typeQuestionBox,
  AppActions
} from '../../types';
import { Dispatch } from 'react';
import { memberConstants } from '../constants';

const memberQuery = gql`
  query($mid: Int!) {
    member(id: $mid) {
      MID
      name
      gender
      dob
      marital_status
      education
      profession
      expertise
      sons
      daughters
      phone
      email
      terms {
        constituency {
          CID
          name
          state
        }
        party {
          PID
          name
          abbr
        }
        house
        session
      }
    }
    questions(
      questionBy: [$mid]
    ) {
      nodes {
        QID
        subject
        type
        questionBy {
          MID
          name
        }
        ministry
        date
      }
    }
  }
`;

export function getMemberById(id: number) {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      const variables = { mid : id };
      const { data } = await client.query({ query: memberQuery, variables });
      
      const popularQuestionIds: number[] = data.questions.nodes.map(
        (each: typeQuestionBox) => each.QID
      );
      
      dispatch({
        type: questionConstants.SET_QUESTIONS,
        data: data.questions.nodes
      });
      
      dispatch({ 
        type: memberConstants.SET_MEMBER, 
        data: {...data.member , popularQuestionIds}
      });

    } catch (error) {
      console.error(error);
    }
  };
}