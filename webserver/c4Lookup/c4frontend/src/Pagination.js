/*
 * Pagination component from @cornflourblue on github
 * https://github.com/cornflourblue/react-pagination-example
 *
 * MIT License
 * 
 * Copyright (c) 2017 Jason Watmore
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const propTypes = {
   items: PropTypes.array.isRequired,
   onChangePage: PropTypes.func.isRequired,
   initialPage: PropTypes.number,
   pageSize: PropTypes.number
}

const defaultProps = {
   initialPage: 1,
   pageSize: 30
}

class PaginationWrapper extends React.Component {
   constructor(props) {
      super(props);
      this.state = { pager: {} };
   }

   componentWillMount() {
      // set page if items array isn't empty
      if (this.props.items && this.props.items.length) {
         this.setPage(this.props.initialPage);
      }
   }

   componentDidUpdate(prevProps, prevState) {
      // reset page if items array has changed
      if (this.props.items !== prevProps.items) {
         this.setPage(this.props.initialPage);
      }
   }

   setPage(page) {
      var { items, pageSize } = this.props;
      var pager = this.state.pager;

      if (page < 1 || page > pager.totalPages) {
         return;
      }

      // get new pager object for specified page
      pager = this.getPager(items.length, page, pageSize);

      // get new page of items from items array
      var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

      // update state
      this.setState({ pager: pager });

      // call change page function in parent component
      this.props.onChangePage(pageOfItems);
   }

   getPager(totalItems, currentPage, pageSize) {
      // default to first page
      currentPage = currentPage || 1;

      // default page size is 10
      pageSize = pageSize || 10;

      // calculate total pages
      var totalPages = Math.ceil(totalItems / pageSize);

      var startPage, endPage;
      if (totalPages <= 10) {
         // less than 10 total pages so show all
         startPage = 1;
         endPage = totalPages;
      } else {
         // more than 10 total pages so calculate start and end pages
         if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
         } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
         } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
         }
      }

      // calculate start and end item indexes
      var startIndex = (currentPage - 1) * pageSize;
      var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      // create an array of pages to ng-repeat in the pager control
      var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

      // return object with all pager properties required by the view
      return {
         totalItems: totalItems,
         currentPage: currentPage,
         pageSize: pageSize,
         totalPages: totalPages,
         startPage: startPage,
         endPage: endPage,
         startIndex: startIndex,
         endIndex: endIndex,
         pages: pages
      };
   }

   render() {
      var pager = this.state.pager;

      if (!pager.pages || pager.pages.length <= 1) {
         // don't display pager if there is only 1 page
         return null;
      }

      return (
         <Pagination aria-label="pagination">

            <PaginationItem disabled={pager.currentPage === 1 ? true : false}>
               <PaginationLink first href="#0" onClick={() => this.setPage(1)}/>
            </PaginationItem>

            <PaginationItem disabled={pager.currentPage === 1 ? true : false}>
               <PaginationLink previous href="#0" onClick={() => this.setPage(pager.currentPage - 1)} />
            </PaginationItem>

            {pager.pages.map((page, index) =>
               <PaginationItem key={index} active={pager.currentPage === page ? true : false}>
                  <PaginationLink href="#0" onClick={() => this.setPage(page)}>{page}</PaginationLink>
               </PaginationItem>
            )}

            <PaginationItem disabled={pager.currentPage === pager.totalPages ? true : false}>
               <PaginationLink next href="#0" onClick={() => this.setPage(pager.currentPage + 1)} />
            </PaginationItem>

            <PaginationItem disabled={pager.currentPage === pager.totalPages ? true : false}>
               <PaginationLink last href="#0" onClick={() => this.setPage(pager.totalPages)} />
            </PaginationItem>

         </Pagination>

      );
   }
}

PaginationWrapper.propTypes = propTypes;
PaginationWrapper.defaultProps = defaultProps;
export default PaginationWrapper;