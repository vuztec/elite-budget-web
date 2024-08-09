import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { getFormattedValueTotal } from '../../utils/budget.calculation';

// Create styles for your PDF components
const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 10,
    flexDirection: 'column', // Ensure content is laid out in column direction
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
  pageBreak: {
    margin: 10,
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
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    fontSize: 10,
    textAlign: 'left',
    flex: 1,
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
  emptyCell: {
    flex: 0.5,
  },
  firstColumn: {
    width: '200px',
  },
});

export const CheckListPDF = ({
  uniqueCategories,
  uniqueBudgetItemsByCategory,
  uniqueDescriptionsByCategory,
  monthHeaders,
  user,
  title,
  owner,
}) => {
  return (
    <Document>
      <Page style={styles.page} orientation="landscape">
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
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.headerCell]}>Savings & Spending</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Day Due</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Monthly Budget</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Payment Method</Text>
            {monthHeaders.map((header, index) => (
              <Text key={index} style={[styles.tableCell, styles.headerCell]}>
                {header}
              </Text>
            ))}
          </View>

          {/* Table Body */}
          {uniqueCategories.map((category, categoryIndex) => (
            <View key={categoryIndex}>
              {/* Category Row */}
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.categoryCell]}>{category}</Text>
                <Text style={styles.emptyCell}></Text>
                <Text style={styles.emptyCell}></Text>
                <Text style={styles.emptyCell}></Text>
                {monthHeaders.map((_, index) => (
                  <Text key={index} style={styles.emptyCell}></Text>
                ))}
              </View>

              {uniqueBudgetItemsByCategory[category]?.map((budgetItem, budgetItemIndex) => (
                <View key={`${category}_${budgetItemIndex}`} wrap={false}>
                  {/* Budget Item Row */}
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.categoryCell]}>{budgetItem}</Text>
                    <Text style={styles.emptyCell}></Text>
                    <Text style={styles.emptyCell}></Text>
                    <Text style={styles.emptyCell}></Text>
                    {monthHeaders.map((_, index) => (
                      <Text key={index} style={styles.emptyCell}></Text>
                    ))}
                  </View>

                  {/* Description Rows */}
                  {uniqueDescriptionsByCategory[category]?.[budgetItem] &&
                    Object.entries(uniqueDescriptionsByCategory[category][budgetItem]).map(
                      ([description, details], descriptionIndex) => (
                        <View style={styles.tableRow} key={`${category}_${budgetItem}_${descriptionIndex}`}>
                          <Text style={styles.tableCell}>{details.NickName ? details.NickName : description}</Text>
                          <Text style={styles.tableCell}>{details.DueDate}</Text>
                          <Text style={styles.tableCell}>{getFormattedValueTotal(user, details.MonthlyBudget)}</Text>
                          <Text style={styles.tableCell}>{details.PaymentMethod}</Text>
                          {monthHeaders.map((_, index) => (
                            <Text key={index} style={styles.tableCell}></Text>
                          ))}
                        </View>
                      ),
                    )}
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
