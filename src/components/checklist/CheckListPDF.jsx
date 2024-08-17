import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import {
  getFormattedValueTotal,
  getMonthlyBudgetCategory,
  getMonthlyBudgetItem,
  getMonthlyBudgetTotal,
} from '../../utils/budget.calculation';

const styles = StyleSheet.create({
  page: {
    padding: 70,
    fontSize: 10,
    flexDirection: 'column',
  },
  headerContainer: {
    width: '100%',
    marginBottom: 10,
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  titleText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 14,
  },
  accountOwnerContainer: {
    marginBottom: 10,
  },
  accountOwnerText: {
    fontSize: 12,
    fontWeight: 'medium',
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    // borderStyle: 'solid',
    // borderWidth: 1,
    borderRight: 1,
    borderColor: '#ccc',
    padding: 5,
    fontSize: 10,
    textAlign: 'left',
  },
  dateCell: {
    width: '4%', // Fixed width for date columns
  },
  headerCell: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  categoryCell: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  pageNumbers: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});

export const CheckListPDF = ({
  uniqueCategories,
  uniqueBudgetItemsByCategory,
  uniqueDescriptionsByCategory,
  monthHeaders,
  combinedData,
  user,
  title,
  owner,
}) => {
  // Calculate the dynamic width for the four columns
  const numOfMonthHeaders = monthHeaders.length;
  const fixedWidth = numOfMonthHeaders * 4; // Total fixed width for date columns
  const remainingWidth = 100 - fixedWidth; // Remaining width to be divided
  const dynamicWidth = remainingWidth / 4; // Dynamic width for each of the four columns

  return (
    <Document>
      <Page style={styles.page} orientation="landscape" size="A3">
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              {title} {user?.FullName ? `for ${user.FullName}` : ''}
            </Text>
          </View>

          <View style={styles.accountOwnerContainer}>
            <Text style={styles.accountOwnerText}>
              Account Owner: <Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{owner}</Text>
            </Text>
          </View>
        </View>

        {/* Table Section */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]} fixed>
            <Text style={[styles.tableCell, styles.headerCell, { width: `${dynamicWidth}%` }]}>Savings & Spending</Text>
            <Text style={[styles.tableCell, styles.headerCell, { width: `${dynamicWidth}%` }]}>NickName</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.dateCell]}>Day Due</Text>
            <Text style={[styles.tableCell, styles.headerCell, { width: `${dynamicWidth}%` }]}>Payment Method</Text>
            <Text style={[styles.tableCell, styles.headerCell, { width: `${dynamicWidth}%` }]}>Monthly Budget</Text>
            {monthHeaders.map((header, index) => (
              <Text key={index} style={[styles.tableCell, styles.headerCell, styles.dateCell]}>
                {header}
              </Text>
            ))}
          </View>

          {/* Table Body */}
          {uniqueCategories.map((category, categoryIndex) => (
            <View key={categoryIndex}>
              {/* Category Row */}
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.categoryCell, { width: `${dynamicWidth}%`, borderRight: 0 }]}>
                  {category}
                </Text>
                <Text
                  style={[styles.tableCell, styles.categoryCell, { width: `${dynamicWidth}%`, borderRight: 0 }]}
                ></Text>
                <Text style={[styles.tableCell, styles.categoryCell, styles.dateCell, { borderRight: 0 }]}></Text>
                <Text
                  style={[styles.tableCell, styles.categoryCell, { width: `${dynamicWidth}%`, borderRight: 0 }]}
                ></Text>
                <Text style={[styles.tableCell, styles.categoryCell, { width: `${dynamicWidth}%`, borderRight: 0 }]}>
                  {getMonthlyBudgetCategory(user, combinedData, category)}
                </Text>
                {monthHeaders.map((_, index) => (
                  <Text
                    key={index}
                    style={[styles.tableCell, styles.categoryCell, styles.dateCell, { borderRight: 0 }]}
                  ></Text>
                ))}
              </View>

              {uniqueBudgetItemsByCategory[category]?.map((budgetItem, budgetItemIndex) => (
                <View key={`${category}_${budgetItemIndex}`} wrap={false}>
                  {/* Budget Item Row */}
                  <View style={styles.tableRow}>
                    <Text
                      style={[styles.tableCell, styles.categoryCell, { width: `${dynamicWidth}%`, borderRight: 0 }]}
                    >
                      {budgetItem}
                    </Text>
                    <Text
                      style={[styles.tableCell, styles.categoryCell, { width: `${dynamicWidth}%`, borderRight: 0 }]}
                    ></Text>
                    <Text style={[styles.tableCell, styles.categoryCell, styles.dateCell, { borderRight: 0 }]}></Text>
                    <Text
                      style={[styles.tableCell, styles.categoryCell, { width: `${dynamicWidth}%`, borderRight: 0 }]}
                    ></Text>
                    <Text
                      style={[styles.tableCell, styles.categoryCell, { width: `${dynamicWidth}%`, borderRight: 0 }]}
                    >
                      {getMonthlyBudgetItem(user, combinedData, category, budgetItem)}
                    </Text>
                    {monthHeaders.map((_, index) => (
                      <Text
                        key={index}
                        style={[styles.tableCell, styles.categoryCell, styles.dateCell, { borderRight: 0 }]}
                      ></Text>
                    ))}
                  </View>

                  {/* Description Rows */}
                  {uniqueDescriptionsByCategory[category]?.[budgetItem] &&
                    Object.entries(uniqueDescriptionsByCategory[category][budgetItem]).map(
                      ([description, details], descriptionIndex) => (
                        <View style={styles.tableRow} key={`${category}_${budgetItem}_${descriptionIndex}`}>
                          <Text style={[styles.tableCell, { width: `${dynamicWidth}%` }]}>{details.Description}</Text>
                          <Text style={[styles.tableCell, { width: `${dynamicWidth}%` }]}>{details.NickName}</Text>
                          <Text style={[styles.tableCell, styles.dateCell]}>{details.DueDate}</Text>
                          <Text style={[styles.tableCell, { width: `${dynamicWidth}%` }]}>{details.PaymentMethod}</Text>
                          <Text style={[styles.tableCell, { width: `${dynamicWidth}%` }]}>
                            {getFormattedValueTotal(user, details.MonthlyBudget)}
                          </Text>
                          {monthHeaders.map((_, index) => (
                            <Text key={index} style={[styles.tableCell, styles.dateCell]}></Text>
                          ))}
                        </View>
                      ),
                    )}
                </View>
              ))}
            </View>
          ))}

          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.headerCell, { width: `${dynamicWidth}%`, borderRight: 0 }]}>
              OVERALL TOTAL
            </Text>
            <Text style={[styles.tableCell, styles.headerCell, { width: `${dynamicWidth}%`, borderRight: 0 }]}></Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.dateCell, { borderRight: 0 }]}></Text>
            <Text style={[styles.tableCell, styles.headerCell, { width: `${dynamicWidth}%`, borderRight: 0 }]}></Text>
            <Text style={[styles.tableCell, styles.headerCell, { width: `${dynamicWidth}%`, borderRight: 0 }]}>
              {getMonthlyBudgetTotal(user, combinedData)}
            </Text>
            {monthHeaders.map((_, index) => (
              <Text
                key={index}
                style={[styles.tableCell, styles.headerCell, styles.dateCell, { borderRight: 0 }]}
              ></Text>
            ))}
          </View>
        </View>

        <Text
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          fixed
          style={styles.pageNumbers}
        />
      </Page>
    </Document>
  );
};
